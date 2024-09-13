"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditTicketForm = ({ ticket }) => {
    const EDITMODE = ticket._id === "new" ? false : true;
    const router = useRouter();
    const startingTicketData = {
      title: "",
      description: "",
      priority: 1,
      progress: 0,
      status: "not started",
      category: "Hardware Problem",
    };
  
    if (EDITMODE) {
      startingTicketData["title"] = ticket.title;
      startingTicketData["description"] = ticket.description;
      startingTicketData["priority"] = ticket.priority;
      startingTicketData["progress"] = ticket.progress;
      startingTicketData["status"] = ticket.status;
      startingTicketData["category"] = ticket.category;
    }
  
    const [formData, setFormData] = useState(startingTicketData);
  
    const handleChange = (e) => {
      const value = e.target.value;
      const name = e.target.name;
  
      setFormData((preState) => ({
        ...preState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (EDITMODE) {
        const res = await fetch(`/api/Tickets/${ticket._id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ formData }),
        });
        if (!res.ok) {
          throw new Error("Failed to update ticket");
        }
      } else {
        const res = await fetch("/api/Tickets", {
          method: "POST",
          body: JSON.stringify({ formData }),
          //@ts-ignore
          "Content-Type": "application/json",
        });
        if (!res.ok) {
          throw new Error("Failed to create ticket");
        }
      }
  
      router.refresh();
      router.push("/");
    };
  
    const categories = [
      "college work",
      "project",
      "aptitude/skills",
      "coding",
    ];
  
    return (
      <div className=" flex justify-center">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-3 w-1/2"
        >
          <h3 className="text-black text-center">{EDITMODE ? "Update Your Ticket" : "Daily Planner"}</h3>
          <label className="text-black">to-do list</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.title}
          />
          <label className="text-black">note</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            required={true}
            value={formData.description}
            rows="5"
          />
          <label className="text-black">type</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories?.map((category, _index) => (
              <option key={_index} value={category}>
                {category}
              </option>
            ))}
          </select>
  
          <label className="text-black">priority</label>
          <div>
            <input
              id="priority-1"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={1}
              checked={formData.priority == 1}
            />
            <label className="text-black">1</label>
            <input
              id="priority-2"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={2}
              checked={formData.priority == 2}
            />
            <label className="text-black">2</label>
            <input
              id="priority-3"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={3}
              checked={formData.priority == 3}
            />
            <label className="text-black">3</label>
            <input
              id="priority-4"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={4}
              checked={formData.priority == 4}
            />
            <label className="text-black">4</label>
            <input
              id="priority-5"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={5}
              checked={formData.priority == 5}
            />
            <label className="text-black">5</label>
          </div>
          <label className="text-black">progress</label>
          <input
            type="range"
            id="progress"
            name="progress"
            value={formData.progress}
            min="0"
            max="100"
            onChange={handleChange}
          />
          <label className="text-black">status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="not started">Not Started</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </select>
          <input
            type="submit"
            className="btn max-w-xs"
            value={EDITMODE ? "Update Ticket" : "Add to daily planner"}
          />
        </form>
      </div>
    );
  };
  
  export default EditTicketForm;