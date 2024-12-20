const Event = require('../models/event'); // Đường dẫn tới file model Event

const createEvent = async (data) => {
    const event = new Event(data);
    return await event.save();
};

const getAllEvents = async (page, limit) => {
    if (page && limit) {
        // Nếu có page và limit, thực hiện phân trang
        const skip = (page - 1) * limit;

        const events = await Event.find()
            .skip(skip) // Bỏ qua các mục trước trang hiện tại
            .limit(limit) // Giới hạn số lượng mục trả về mỗi trang
            .sort({ event_date: -1 }); // Sắp xếp theo ngày (mới nhất trước)

        const totalEvents = await Event.countDocuments(); // Tổng số sự kiện
        const totalPages = Math.ceil(totalEvents / limit); // Tính tổng số trang

        return {
            data: events,
            totalEvents,
            totalPages,
            currentPage: page
        };
    } else {
        // Nếu không có page và limit, trả về tất cả các sự kiện
        const events = await Event.find().sort({ event_date: -1 }); // Sắp xếp theo ngày
        return {
            data: events,
            totalEvents: events.length,
            totalPages: 1,
            currentPage: 1
        };
    }
};

const getEventById = async (id) => {
    return await Event.findById(id);
};

const updateEvent = async (id, data) => {
    return await Event.findByIdAndUpdate(id, data, { new: true });
};

const deleteEvent = async (id) => {
    return await Event.findByIdAndDelete(id);
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};