"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    tags: "",
    venue: "",
    location: "",
    mode: "",
    audience: "",
    agenda: "",
    organizer: "",
    overview: "",
    image:"",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file)
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formElement = e.currentTarget
    

    try {
      const data = new FormData(e.currentTarget);

      const tags = (data.get("tags") || "").toString();
      const agenda = (data.get("agenda") || "").toString();

      if(imageFile){
        data.set("image", imageFile)
      }else{
        alert('There is no Image Provided')
        setLoading(false)
        return;
      }
      // Format comma-separated tags into array
      data.set(
        "tags",
        JSON.stringify(tags.split(",").map((tag) => tag.trim()).filter(Boolean))
      );

      // Format line-separated agenda items into array
      data.set(
        "agenda",
        JSON.stringify(agenda.split("\n").map((item) => item.trim()).filter(Boolean))
      );

      const response = await fetch("/api/events", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Event creation failed");
        return;
      }

      console.log("Created event:", result.event);
      
      
      
      router.push("/");
      router.refresh()
    } catch (error) {
      console.error("CREATE EVENT ERROR:", error);
      alert("An error occurred while creating the event.");
    } finally {
      formElement.reset()
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
          Event Management
        </div>

        <h1>
          Create Event
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
          Add the details for your event and share it with your audience.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="space-y-8">
          {/* Basic Information */}
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Basic Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Tell people what your event is about.
              </p>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Event title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Cloud Next 2028"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Short description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly describe your event..."
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                />
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>

                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>

                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Event Image */}
          <section className="border-t border-gray-100 pt-8">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Event image
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Choose an image that represents your event.
              </p>
            </div>

            {imagePreview ? (
              <div className="relative overflow-hidden rounded-2xl border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Event preview"
                  className="h-64 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <label
                htmlFor="image"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center transition hover:border-gray-400 hover:bg-gray-100"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M12 16V4m0 0l-4 4m4-4l4 4M4 16.5v1.25A2.25 2.25 0 006.25 20h11.5A2.25 2.25 0 0020 17.75V16.5"
                    />
                  </svg>
                </div>

                <span className="text-sm font-medium text-gray-900">
                  Click to upload an image
                </span>

                <span className="mt-1 text-xs text-gray-500">
                  PNG, JPG or WEBP
                </span>

                <input
                  id="image"
                  name="image"
                  type="file"
                  
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  required
                  className="hidden"
                />
              </label>
            )}
          </section>

          {/* Location & Format */}
          <section className="border-t border-gray-100 pt-8">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Location & format
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Let attendees know where and how the event will happen.
              </p>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Venue */}
                <div>
                  <label
                    htmlFor="venue"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Venue
                  </label>

                  <input
                    id="venue"
                    name="venue"
                    type="text"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="e.g. Millennium Hall"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                  />
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Addis Ababa, Ethiopia"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                  />
                </div>
              </div>

              {/* Mode */}
              <div>
                <label
                  htmlFor="mode"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Event mode
                </label>

                <select
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                >
                  <option value="">Select event mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </section>

          {/* Audience & Organizer */}
          <section className="border-t border-gray-100 pt-8">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Audience & organizer
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="audience"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Audience
                </label>

                <input
                  id="audience"
                  name="audience"
                  type="text"
                  value={formData.audience}
                  onChange={handleChange}
                  placeholder="e.g. Developers, students, entrepreneurs"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                />
              </div>

              <div>
                <label
                  htmlFor="organizer"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Organizer
                </label>

                <input
                  id="organizer"
                  name="organizer"
                  type="text"
                  value={formData.organizer}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                />
              </div>
            </div>
          </section>

          {/* Tags */}
          <section className="border-t border-gray-100 pt-8">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
              <p className="mt-1 text-sm text-gray-500">
                Add keywords to help people discover your event.
              </p>
            </div>

            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              placeholder="technology, cloud, AI, developers"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
            />

            <p className="mt-2 text-xs text-gray-500">
              Separate multiple tags with commas.
            </p>
          </section>

          {/* Overview & Agenda */}
          <section className="border-t border-gray-100 pt-8">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Event details
              </h2>
            </div>

            <div className="space-y-5">
              {/* Overview */}
              <div>
                <label
                  htmlFor="overview"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Overview
                </label>

                <textarea
                  id="overview"
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  placeholder="Provide a detailed overview of the event..."
                  rows={6}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                />
              </div>

              {/* Agenda */}
              <div>
                <label
                  htmlFor="agenda"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Agenda
                </label>

                <textarea
                  id="agenda"
                  name="agenda"
                  value={formData.agenda}
                  onChange={handleChange}
                  placeholder={`10:00 AM - Opening\n11:00 AM - Keynote\n12:00 PM - Workshop\n2:00 PM - Panel Discussion`}
                  rows={7}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Enter each agenda item on a new line.
                </p>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="border-t border-gray-100 pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-black px-5 py-3.5 font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
            >
              {loading
                ? "Creating Event (This might take a moment)..."
                : "Create Event"}
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              Make sure all event information is correct before publishing.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;