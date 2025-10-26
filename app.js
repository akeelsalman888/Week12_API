// URL of the JSON server 
const url = 'http://localhost:3000/students';

// Get form and list elements in HTML
const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

// display students data
async function displayStudents() {
    try {
        // Fetch all student data from the server
        const response = await fetch(url);
        const students = await response.json();
        studentList.innerHTML = '';

        // Loop through each student + create li(s)
        students.forEach(student => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            // Show student name and course
            const span = document.createElement('span');
            span.textContent = `${student.name} - ${student.course}`;

            // Create Delete button for each student
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm';
            deleteBtn.textContent = 'Delete';

            //Remove that student (Delete button)
            deleteBtn.addEventListener('click', () => deleteStudent(student.id));

            // Add elements to the list item
            li.appendChild(span);
            li.appendChild(deleteBtn);
            studentList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        }
}


//Create(Add a new student)
  studentForm.addEventListener('submit', async (e) => {
      e.preventDefault(); 

      // Get input values (HTML)
        const name = document.getElementById('studentName').value.trim();
        const course = document.getElementById('course').value.trim();

      // Check for name and course if empty
        if (!name || !course) {
          alert('Please fill all fields.');
          return;
        }

      const newStudent = { name, course };

      try {
          //POST request (create a new student)
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent)
          });

          await response.json();

          // Clear the form
          studentForm.reset();
          displayStudents();
      } catch (error) {
          console.error("Error adding student:", error);
        }
  });

      //Delete Studnet using id
      async function deleteStudent(id) {
          // Ask for confirmation before deleting
          if (!confirm("Are you sure you want to delete this student?")) return;

          try {
            // Send DELETE request (emove student by ID)
            const response = await fetch(`${url}/${id}`, { method: 'DELETE' });

            if (!response.ok) throw new Error("Failed to delete student.");

            // Refresh list after deletion
            displayStudents();
          } catch (error) {
            console.error("Error deleting student:", error);
          }
  }

displayStudents();
