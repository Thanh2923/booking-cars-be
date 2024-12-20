const eventService = require('../services/eventService');
const createEvent = async (req, res) => {
    const { event_name, event_date, description } = req.body;
    const image = req.file ? req.file.filename : null;
    try {
        const newEvent = await eventService.createEvent({image,event_name, event_date, description});
        return res.status(201).json(newEvent);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả sự kiện
const getAllEvents = async (req, res) => {
    const { page, limit } = req.query; // Lấy page và limit từ query
    try {
        // Nếu có page và limit, thực hiện phân trang, ngược lại lấy toàn bộ sự kiện
        const events = page && limit 
            ? await eventService.getAllEvents(Number(page), Number(limit))
            : await eventService.getAllEvents();

        return res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ error: error.message });
    }
};


// Lấy sự kiện theo ID
const getEventById = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await eventService.getEventById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Cập nhật sự kiện
const updateEvent = async (req, res) => {
    const { event_name, event_date, description } = req.body;
    const image = req.file ? req.file.filename : null;
    const id = req.params.id;
    try {

        const updatedEvent = await eventService.updateEvent(id, {event_name, event_date, description,image});
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        return res.status(200).json(updatedEvent);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Xóa sự kiện
const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEvent = await eventService.deleteEvent(id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
