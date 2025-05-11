document.addEventListener('DOMContentLoaded', () => {
    const newItemInput = document.getElementById('newItem');
    const addItemBtn = document.getElementById('addItemBtn');
    const shoppingList = document.getElementById('shoppingList');
    const emptyListMessage = document.getElementById('emptyListMessage');

    let items = loadItems();

    function saveItems() {
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
    }

    function loadItems() {
        const storedItems = localStorage.getItem('shoppingListItems');
        return storedItems ? JSON.parse(storedItems) : [];
    }

    function toggleEmptyMessage() {
        if (items.length === 0) {
            emptyListMessage.classList.remove('d-none');
        } else {
            emptyListMessage.classList.add('d-none');
        }
    }

    function addItem() {
        const itemName = newItemInput.value.trim();
        if (itemName) {
            const newItemObject = {
                id: Date.now(),
                name: itemName,
                purchased: false
            };
            items.push(newItemObject);
            renderList();
            newItemInput.value = '';
            toggleEmptyMessage();
            saveItems();
        }
    }

    function renderList() {
        shoppingList.innerHTML = '';

        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = item.name;
            listItem.setAttribute('data-id', item.id);

            if (item.purchased) {
                listItem.classList.add('purchased');
            }

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.setAttribute('aria-label', `Ta bort ${item.name} från listan`);
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('bi', 'bi-trash-fill');
            deleteButton.appendChild(deleteIcon);
            deleteButton.setAttribute('type', 'button');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                removeItem(item.id);
            });
            listItem.appendChild(deleteButton);

            listItem.addEventListener('click', () => {
                togglePurchased(item.id);
            });

            shoppingList.appendChild(listItem);
        });
    }

    function togglePurchased(itemId) {
        items = items.map(item =>
            item.id === itemId ? { ...item, purchased: !item.purchased } : item
        );
        renderList();
        saveItems();
    }

    function removeItem(itemId) {
        items = items.filter(item => item.id !== itemId);
        renderList();
        toggleEmptyMessage();
        saveItems();
    }

    addItemBtn.addEventListener('click', addItem);

    newItemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItem();
        }
    });

    renderList();
    toggleEmptyMessage();
});