import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from 'services/firebase/config'

const storage = getStorage(app);

export function writeFile({ file, expenseId, filename, userId }) {
  const storageRef = ref(storage, `${userId}/${expenseId}/${filename}`);

  uploadBytes(storageRef, file)
}

export async function readFile({ userId, postId, filename }) {
  const path = filename === 'example.png' ? 'example.png' : `${userId}/${postId}/${filename}`

  const pathReference = ref(storage, path);

  return await getDownloadURL(pathReference)
}
