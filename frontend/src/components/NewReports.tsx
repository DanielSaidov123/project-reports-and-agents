import { useState } from "react";
import { createRports } from "../api/axios";
import { useRequest } from "../Hooks/useRequest";

export default function NewReports() {
  const [reports, setReports] = useState({
    category: "",
    urgency: "",
    message: "",
    imagePath: null as File | null,
  });
  const { request, loading, error,success } = useRequest();
  const handleSubmit = async (e: React.FormEvent) => {
    const formData = new FormData();
    formData.append("category", reports.category);
    formData.append("urgency", reports.urgency);
    formData.append("message", reports.message);

    if (reports.imagePath) {
      formData.append("image", reports.imagePath);
    }
    e.preventDefault();

    await request(() => createRports(formData));
  };

  return (
    <form className="form-reports" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="category"
        className="text"
        required
        value={reports.category}
        onChange={(e) => setReports({ ...reports, category: e.target.value })}
      />

      <select
        className="text"
        required
        value={reports.urgency}
        onChange={(e) => setReports({ ...reports, urgency: e.target.value })}
      >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <textarea
        placeholder="message"
        rows={4}
        className="text"
        required
        value={reports.message}
        onChange={(e) => setReports({ ...reports, message: e.target.value })}
      />
      <div>
        <label htmlFor="image-input" className="custom-file-label">
          Choose a picture:
        </label>
        <input
          type="file"
          accept="image/*"
          className="text"
          id="image-input"
          onChange={(e) =>
            setReports({ ...reports, imagePath: e.target.files?.[0] || null })
          }
        />
      </div>
      <button type="submit">{loading && <p>loading...</p>}{!loading && <p>create Rport</p>}</button>
      {error && <p className="error">{error}</p>}
     {success && <p className="success">Created Report!</p>}
    </form>
  );
}
