import * as dotenv from "dotenv";
dotenv.config();
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.Firebase_apiKey,
  authDomain: process.env.Firebase_authDomain,
  projectId: process.env.Firebase_projectId,
  storageBucket: process.env.Firebase_storageBucket,
  messagingSenderId: process.env.Firebase_messagingSenderId,
  appId: process.env.Firebase_appId,
};

const MIME_TYPES = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileExtention = MIME_TYPES[file?.mimetype];
    

    if (!fileExtention) {
      reject("unsupported file type");
    }

    const fileRef = ref(storage, `photos/${uuidv4()}.${fileExtention}`);

    uploadBytes(fileRef, file.buffer)
      .then(() => {
        return getDownloadURL(fileRef);
      })
      .then((url) => {
        resolve(url);
      })
      .catch((err) => {
        reject("unknown error");
      });
  });
};
