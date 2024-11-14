"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Topic {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function TopicsList() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch topics from API
  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch("/api/topics");
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }
        const data = await res.json();
        setTopics(data.topics);
      } catch (error) {
        console.error("Error loading topics: ", error);
        setError("Failed to load topics");
      } finally {
        setLoading(false);
      }
    }
    fetchTopics();
  }, []);

  // Handle submission of new topic
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }
    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading topics...</p>;
  if (error) return <p>Error: {error}</p>;
  if (topics.length === 0) return <p>No topics found.</p>;

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="border border-slate-500 p-4"
          type="text"
          placeholder="Topic Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
        <textarea
          className="border border-slate-500 p-4 h-32"
          placeholder="Topic Description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          value={description}
        />
        <button
          className="bg-green-800 text-white font-bold px-6 py-3 w-fit rounded-md"
          type="submit"
        >
          Add Topic
        </button>
      </form>
    </>
  );
}
