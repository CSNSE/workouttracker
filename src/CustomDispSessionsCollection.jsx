import React, { useState, useEffect } from "react";
import CustomDispSessions from "./CustomDispSessions";
import { generateClient } from "aws-amplify/api";
import { listSessions } from "./graphql/queries";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"; // Import icons for navigation
import { BsChevronDown } from "react-icons/bs"; // Import Chevron Down icon

import "./CustomDispSessions.css"; // Assuming you have a CSS file for styling

const client = generateClient();

export default function CustomDispSessionCollection() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("newest"); // Set default filter to "newest"
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const { data } = await client.graphql({
        query: listSessions,
      });
      setSessions(data.listSessions.items);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    applyFilter(filter);
  }, [filter]);

  const applyFilter = (selectedFilter) => {
    let filteredSessions = [...sessions]; // Make a copy of sessions array to preserve original data

    if (selectedFilter === "newest") {
      filteredSessions.sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Sort sessions by newest date
    } else if (selectedFilter === "oldest") {
      filteredSessions.sort((a, b) => new Date(a.Date) - new Date(b.Date)); // Sort sessions by oldest date
    }

    setSessions(filteredSessions); // Update sessions state with filtered sessions
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleNextWeekClick = () => {
    const nextWeekStartDate = new Date(startDate);
    const nextWeekEndDate = new Date(endDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
    nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 7);
    setStartDate(nextWeekStartDate);
    setEndDate(nextWeekEndDate);
  };

  const handlePrevWeekClick = () => {
    const prevWeekStartDate = new Date(startDate);
    const prevWeekEndDate = new Date(endDate);
    prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);
    prevWeekEndDate.setDate(prevWeekEndDate.getDate() - 7);
    setStartDate(prevWeekStartDate);
    setEndDate(prevWeekEndDate);
  };

  return (
    <div>
      <div className="filterDropdown">
        <select onChange={handleFilterChange} value={filter}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      {loading ? (
        <div>Loading sessions...</div>
      ) : (
        <div>
          <div className="weekChanger">
            <button onClick={handlePrevWeekClick}>
              <BsChevronLeft />
            </button>
            <button onClick={handleNextWeekClick}>
              <BsChevronRight />
            </button>
          </div>
          <div className="customDispSessionCollection">
            {sessions.map((session) => (
              <CustomDispSessions key={session.id} session={session} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
