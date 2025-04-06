import { db } from "@/lib/firebase";
import { Resume } from "@/lib/schemas/resume.schema";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where 
} from "firebase/firestore";

const RESUME_COLLECTION = "resumes";

export async function getResumeByHandle(handle: string): Promise<Resume | null> {
  try {
    const resumesRef = collection(db, RESUME_COLLECTION);
    const q = query(resumesRef, where("handle", "==", handle), where("private", "==", false));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const resumeData = querySnapshot.docs[0].data() as Resume;
    return resumeData;
  } catch (error) {
    console.error("Error fetching resume by handle:", error);
    return null;
  }
}

export async function getResumeById(id: string): Promise<Resume | null> {
  try {
    const resumeRef = doc(db, RESUME_COLLECTION, id);
    const resumeSnapshot = await getDoc(resumeRef);
    
    if (!resumeSnapshot.exists()) {
      return null;
    }
    
    const resumeData = resumeSnapshot.data() as Resume;
    return resumeData;
  } catch (error) {
    console.error("Error fetching resume by id:", error);
    return null;
  }
}

export async function getUserResumes(userId: string): Promise<Resume[]> {
  try {
    const resumesRef = collection(db, RESUME_COLLECTION);
    const q = query(resumesRef, where("email", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const resumes: Resume[] = [];
    querySnapshot.forEach((doc) => {
      resumes.push(doc.data() as Resume);
    });
    
    return resumes;
  } catch (error) {
    console.error("Error fetching user resumes:", error);
    return [];
  }
}