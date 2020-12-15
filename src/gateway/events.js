const baseUrl = 'https://5f4107e4a5e9db0016302376.mockapi.io/api/v1/eventsList';

export const getEventsList = () => {
    return fetch(baseUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(eventsList => eventsList);
}

export const createEvent = event => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(event)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create event');
        }
    });
}

export const deleteEvent = eventId => {
    return fetch(`${baseUrl}/${eventId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete event');
        }
    });
}

