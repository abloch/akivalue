import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, getDocs, where, orderBy } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js'

class CommentSystem {
  constructor(firebaseConfig, formId, commentsContainerId, documentName ) {
    this.formId = formId;
    this.commentsContainerId = commentsContainerId;
    this.documentName = documentName;
    
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.commentsRef = collection(this.db, 'comments');
    this.initForm();
    this.initComments();
  }

  async initForm() {
    const form = document.getElementById(this.formId);

    if (!form) throw new Error(`Form element with ID ${this.formId} not found`);

    const name = window.localStorage.getItem('name');
    if (name) {
        document.getElementById('name').value = name;
    }
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value;
      const comment = form.querySelector('#comment').value;
      window.localStorage.setItem('name', name);
      if (name && comment) {
        try {
          await addDoc(this.commentsRef, {
            page: this.documentName,
            name: name,
            comment: comment,
            timestamp: new Date()
          });
          form.reset();
          this.initComments();
        } catch (error) {
          console.error('Error submitting comment:', error);
        }
      }
    });
  }

 
  async initComments() {
    const commentsContainer = document.getElementById(this.commentsContainerId);
    if (!commentsContainer) throw new Error(`Comments container with ID ${this.commentsContainerId} not found`);

    const q = query(this.commentsRef, where("page", "==", this.documentName), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const comment = doc.data();
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
          <div class="comment-header">
            <span class="comment-author">${comment.name}</span>
            <span>${new Date(comment.timestamp?.toDate()).toLocaleString()}</span>
          </div>
          <p>${comment.comment}</p>
        `;
        commentsContainer.appendChild(commentElement);
      });
}
}

export default CommentSystem;