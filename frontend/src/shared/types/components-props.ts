export interface ListItemProps {
  name: string;
  deleteBtnCallback: () => void;
  deleteDisabled: boolean;
  editButtonCallback: () => void;
  editDisabled: boolean;
}