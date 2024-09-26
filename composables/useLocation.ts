import { Notify } from 'quasar'

export function useLocation() {
  async function getLocation(): Promise<{ lat: number, lon: number } | undefined> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            resolve({ lat, lon })
          },
          (err) => {
            Notify.create({
              message: err.message,
              icon: 'announcement',
              color: 'red',
            })
            reject(err)
          },
        )
      } else {
        Notify.create({
          message: 'Geolocation is not supported by this browser',
          icon: 'announcement',
          color: 'red',
        })
        resolve(undefined)
      }
    })
  }

  return {
    getLocation,

  }
}
