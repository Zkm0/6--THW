$(document).ready(function() {
    const bucketList = [];
    
    class BucketListItem {
      constructor(title, description, progress, url, comment = '') {
        this.id = Math.random().toString(16).slice(5);
        this.title = title;
        this.description = description;
        this.progress = progress;
        this.url = url;
        this.comment = comment;
      }
    }
  
    const form = document.getElementById('form');
    let currentItem = null;
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const progress = document.getElementById('progress').value;
      const url = document.getElementById('imageurl').value;
  
      bucketList.push(new BucketListItem(title, description, progress, url));
  
      form.reset();
    });
   function displayBucketList() {
      const list = document.getElementById('bucketlist');
      list.innerHTML = '';
  
      for (let item of bucketList) {
        const listItem = document.createElement('li');
        listItem.id = item.id;
        listItem.classList.add('bucket-list-item');
        
        listItem.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <p>Progress: ${item.progress}%</p>
          <p><a href="${item.url}" target="_blank">Resources</a></p>
          <p>Comment: ${item.comment}</p>
         
        `;      
        list.appendChild(listItem);
      }
    }
  
 
   
    $(document).on('click', '.bucket-list-item', function() {
      const id = this.id;
      currentItem = bucketList.find(item => item.id === id);
      
  
      $.mobile.navigate("#update");
    });
  

    const updateForm = document.getElementById('updateForm');
    updateForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      
      const progress = document.getElementById('updateProgress').value;
      const comment = document.getElementById('comment').value;
      currentItem.progress = progress;
      currentItem.comment = comment;
      displayBucketList();
      $.mobile.navigate("#display");
    });


  $(document).on('click', '.add-item', function() {
    const title = $(this).prev().prev().text();
    const url = $(this).prev().attr('href');
    const description = "Please fill the description"; 
    bucketList.push(new BucketListItem(title, description, 0, url));
    displayBucketList();
    $.mobile.navigate("#display");
  });

  $(document).on("pagebeforeshow", "#display", function() {
    displayBucketList();
  });
  

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', function() {
      const index = bucketList.findIndex(item => item.id === currentItem.id);
      bucketList.splice(index, 1);
  
    
      $.mobile.navigate("#display");
    });
  
 
  
    $(document).on("pagebeforeshow", "#display", function() {
      displayBucketList();
    });
  });
    








