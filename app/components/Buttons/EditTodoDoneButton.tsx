import { Todo, useTodoStore } from "@/app/store/store";

type EditTodoDoneButtonProps = {
  id: Todo['id'];
  newTitle: Todo['title'];
  setEditMode: (editMode: boolean) => void;
}
export default function EditTodoDoneButton({ id, newTitle, setEditMode }: EditTodoDoneButtonProps) {
  const changeTitle = useTodoStore(state => state.changeTitle);

  function handleTodoEditModeDone(event: React.MouseEvent | React.TouchEvent) {
    event.preventDefault();
    setEditMode(true);
    changeTitle(id, newTitle);
  }
  return (
    <button
      type="button"
      title="edit finish button"
      onClick={handleTodoEditModeDone}
      className="hover:bg-green-700/75 bg-green-600 border rounded-full p-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 stroke-current stroke-2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12l6 6L19.5 7" />
      </svg>
    </button>
  );
}