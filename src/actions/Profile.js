import { database } from 'firebase.js'

const getProfile = async (currentUser) => {
  let profile = await database.profile.where('userId', '==', currentUser.uid).get()
  return profile
}

const setProfile = async (currentUser) => {
  let profile = await database.profile.where('userId', '==', currentUser.uid).get()
  // if user doesn't have a profile doc, add one
  if (!profile.docs[0]) {
    database.profile.add({
      userId: currentUser.uid,
      avatar: ''
    })
  }
}

export {
  getProfile,
  setProfile
}


