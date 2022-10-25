export const setWithExpiration = (key: string, value: any, ttl: number) => {
    const now = new Date();
    const item = {
        data: value,
        expired: now.getTime() + (ttl*1000),
    }
    localStorage.setItem(key, JSON.stringify(item))
}

export const getWithExpiration = (key: string) => {
    const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expired) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.data
}