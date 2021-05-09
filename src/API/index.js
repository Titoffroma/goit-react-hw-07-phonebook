async function addContactToAPI(contact) {
  const headers = new Headers({
    'content-type': 'application/x-www-form-urlencoded',
    accept: 'application/json',
  });
  const request = new Request('http://localhost:3004/contacts', {
    method: 'POST',
    headers,
    body: contact,
  });
  const response = await fetch(request);
  if (response.ok) {
    return response.json();
  }
  return {
    error: `Something went wrong with the contact ${contact.name}`,
  };
}

async function removeContactFromAPI(id) {
  const headers = new Headers({
    accept: 'application/json',
  });
  const request = new Request(`http://localhost:3004/contacts/${id}`, {
    method: 'DELETE',
    headers,
  });
  const response = await fetch(request);
  if (response.ok) {
    return response.json();
  }
  return { error: `Something went wrong with the contact with id=${id}` };
}

export { addContactToAPI, removeContactFromAPI };
