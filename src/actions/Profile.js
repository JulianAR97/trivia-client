import { database } from 'firebase.js'

const getProfile = async (currentUser) => {
  let profile = await database.profile.where('userId', '==', currentUser.uid).get()
  return profile
}

export {
  getProfile,
}


