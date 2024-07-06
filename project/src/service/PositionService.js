export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    resolve([lat, lon]);  // Trả về mảng các tọa độ khi có kết quả
                },
                (error) => {
                    reject(error);  // Trả về lỗi nếu có sự cố
                }
            );
        } else {
            reject('Geolocation is not supported by this browser.');
        }
    });
};
export async function showCurrentLocation() {
    try {
        const location = await getCurrentLocation();
        console.log('Latitude:', location[0], 'Longitude:', location[1]);
        return location;
    } catch (error) {
        console.error('Error getting location:', error);
    }
}
