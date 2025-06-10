type EditTodoStartButtonProps = {
  setEditMode: (editMode: boolean) => void;
};

export default function EditTodoStartButton({ setEditMode }: EditTodoStartButtonProps) {

  function handleTodoEditModeEdit(event: React.MouseEvent | React.TouchEvent) {
    event.preventDefault();
    setEditMode(false);
  }
  return (
    <button
      type="button"
      title="edit start button"
      onClick={handleTodoEditModeEdit}
      className="hover:bg-blue-700/75 border rounded-full p-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 stroke-current stroke-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 3.487a2.5 2.5 0 00-3.536 0L4.5 11.25V17h5.75l8.826-8.826a2.5 2.5 0 000-3.536l-1.414-1.414z" />
      </svg>
    </button>
  );
}