export const UPLOAD_API = "http://192.168.1.178:3001/upload";
export const GET_API = "http://192.168.1.178:3001/files";
export const COLORS = {
  displayed: "bg-[#D9D9D9] w-6 h-6",
  selected: "bg-[#9CD1CE] w-6 h-6",
  inserted: "bg-[#9cd1a9] w-6 h-6",
};

export const MODES = {
  displayed: "displayed",
  selected: "selected",
  inserted: "inserted",
  error: "error",
  loading: "loading",
  success: "success"
};

export const ACTIONS = {
  select: "select",
  insert: "insert",
  delete: "delete",
  maxNodes: 5,
  updateName: "update",
  updateTree: "tree",
  dirs_initial: "start",
  dirs_success: "dirs_success",
  dirs_error: "dirs_error",
};
