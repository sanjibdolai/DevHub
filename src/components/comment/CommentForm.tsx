import React from "react";

interface CommentFormProps {
  comment: string;
  setComment: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ comment, setComment, onSubmit, submitting }) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-2">
    <textarea
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
      placeholder="Add a comment..."
      value={comment}
      onChange={e => setComment(e.target.value)}
      required
    />
    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={submitting}>
      {submitting ? "Posting..." : "Post Comment"}
    </button>
  </form>
);

export default CommentForm;
