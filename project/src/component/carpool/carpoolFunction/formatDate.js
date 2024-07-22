export const formatDate = (dateString) => {
    const newDate = new Date(dateString);
    return newDate.toLocaleString();
};