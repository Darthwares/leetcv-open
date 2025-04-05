export async function getUserCollegeAndRole(
  ctx: {
    firestore: FirebaseFirestore.Firestore;
  },
  userId: string,
  handle: { userId: string }
) {
  let sessionUserCollegeName = null;
  let role = null;

  try {
    // Fetch both collections concurrently
    const [
      collegeProfessorSnapshot,
      collegeAdminSnapshot,
      collegeStudentSnapshot,
    ] = await Promise.all([
      ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("college-professor-invite")
        .get(),
      ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("college-admin-invite")
        .get(),
      ctx.firestore
        .collection("users")
        .doc(handle.userId)
        .collection("college-student")
        .doc(handle.userId)
        .get(),
    ]);

    // Check for college and role in collegeProfessorSnapshot first
    if (!collegeProfessorSnapshot.empty) {
      const professorData = collegeProfessorSnapshot.docs[0].data();
      sessionUserCollegeName = professorData.college || null;
      role = professorData.role || null;
    }

    // If not found in professor, check in collegeAdminSnapshot
    if (!sessionUserCollegeName && !collegeAdminSnapshot.empty) {
      const adminData = collegeAdminSnapshot.docs[0].data();
      sessionUserCollegeName = adminData.college || null;
      role = adminData.role || null;
    }

    // Check for college in collegeStudentSnapshot
    let collegeName = null;
    if (collegeStudentSnapshot.exists) {
      const studentData = collegeStudentSnapshot.data();
      collegeName = studentData?.college || null;
    }

    // Determine if the resume is visible based on the criteria
    const isVisibleResume =
      sessionUserCollegeName === collegeName &&
      (role === "Admin" || role === "Professor");

    return { sessionUserCollegeName, role, collegeName, isVisibleResume };
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle error appropriately (e.g., return null values or throw an error)
    return {
      sessionUserCollegeName: null,
      role: null,
      collegeName: null,
      isVisibleResume: false,
    };
  }
}
