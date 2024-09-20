function deleteRespnse() {
    return new Promise((resolve) => {
        let div = document.createElement('div');
        div.className = 'overlay';
        div.innerHTML = `<div class="deleteMsgContainer">
            <p>Are you Sure?</p>
            <div class="btnContainer">
              <button class="btn yes" id = "yes">Yes</button>
              <button class="btn no" id = "no">No</button>
            </div>
          </div>
         `;

        document.body.appendChild(div);
        document.getElementById('yes').addEventListener('click', () => {
            div.remove();
            resolve(true);
        });
        document.getElementById('no').addEventListener('click', () => {
            div.remove();
            resolve(false);
        });
    })
} 