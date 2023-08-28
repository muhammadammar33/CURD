const entryForm = document.getElementById('entry-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const entryIdInput = document.getElementById('entryId');
const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];

let entries = JSON.parse(localStorage.getItem('entries')) || [];

function renderEntries() {
    dataTable.innerHTML = '';

    entries.forEach((entry, index) => {
        const row = dataTable.insertRow();
        const cellName = row.insertCell(0);
        const cellEmail = row.insertCell(1);
        const cellAction = row.insertCell(2);

        cellName.innerHTML = entry.name;
        cellEmail.innerHTML = entry.email;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editEntry(index));
        cellAction.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteEntry(index));
        cellAction.appendChild(deleteButton);
    });
}

function addEntry(name, email) {
    const entry = { name, email };
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
    renderEntries();
    clearForm();
}

function editEntry(index) {
    const entry = entries[index];
    nameInput.value = entry.name;
    emailInput.value = entry.email;
    entryIdInput.value = index;
}

function updateEntry(index, name, email) {
    entries[index].name = name;
    entries[index].email = email;
    localStorage.setItem('entries', JSON.stringify(entries));
    renderEntries();
    clearForm();
}

function deleteEntry(index) {
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    renderEntries();
    clearForm();
}

function clearForm() {
    nameInput.value = '';
    emailInput.value = '';
    entryIdInput.value = '';
}

entryForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const entryId = entryIdInput.value;

    if (name && email) {
        if (entryId === '') {
            addEntry(name, email);
        } else {
            updateEntry(entryId, name, email);
        }
    } else {
        alert('Please enter both name and email.');
    }
});

// Initial rendering of entries
renderEntries();
