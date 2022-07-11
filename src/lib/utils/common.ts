export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"})
}