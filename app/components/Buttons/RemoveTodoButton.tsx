import { Todo, useTodoStore } from "@/app/store/store";

type RemoveTodoButtonProps = {
  id: Todo['id'];
};

export default function RemoveTodoButton({ id }: RemoveTodoButtonProps) {
  const removeTodo = useTodoStore(state => state.removeTodo);

  function handleRemoveTodo(event: React.MouseEvent | React.TouchEvent, id: Todo['id']) {
    event.preventDefault();
    removeTodo(id);
  }
  return (
    <button
      type="button"
      title="delete button"
      onClick={(event) => handleRemoveTodo(event, id)}
      className="hover:bg-red-700/75 border rounded-full p-1 min-w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 stroke-current stroke-2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 6.75l-1.5 12a2.25 2.25 0 01-2.25 2.25H8.25a2.25 2.25 0 01-2.25-2.25l-1.5-12m15-3h-4.5m-6 0H4.5m3 0V3a1.5 1.5 0 013 0v1.5m6 0V3a1.5 1.5 0 00-3 0v1.5m6 0h-9" />
      </svg>
    </button>
  );
}