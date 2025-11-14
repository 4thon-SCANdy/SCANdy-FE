import React from "react";
import RegisterModal from "./RegisterModal";

function EditScheduleModal({
  open,
  onClose,
  schedule,
  onSave,
  onDelete,
}) {
  return (
    <RegisterModal
      open={open}
      onClose={onClose}
      editSchedule={schedule}
      onSaveEdit={onSave}
      onDeleteEdit={onDelete}
    />
  );
}

export default EditScheduleModal;


