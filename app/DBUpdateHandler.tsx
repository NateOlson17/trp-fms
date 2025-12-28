let onUpdateRequested: (() => void);

export const registerDBUpdateHandler = (fn: () => void) => onUpdateRequested = fn;

const requestDBUpdate = () => onUpdateRequested?.();

export default requestDBUpdate;