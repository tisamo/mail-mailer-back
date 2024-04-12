const scheduler = require('node-cron');
const Schedule = require('../model/schedule');
const {sendMail} = require('./mail');

function scheduleCronJob(functionToSchedule, schedule) {
    let  cronSchedule;
    if(schedule.includes('*')){
        cronSchedule = schedule;
    } else{
        const parsedDate = new Date(schedule);
       cronSchedule =`${parsedDate.getSeconds()} ${parsedDate.getMinutes()} ${parsedDate.getHours()} ${parsedDate.getDate()} ${parsedDate.getMonth() + 1} *`;
    }
    scheduler.schedule(cronSchedule, async () => {
        await functionToSchedule();
    });
}


async function scheduleMailsForToday() {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    const schedules = await Schedule.find({
        date: {
            $gte: startOfToday,
            $lte: endOfToday
        }
    }).populate({
        path: 'task',
        populate: {
            path: 'recipients'
        }
    });
    const mails = schedules.map((schedule) => {
        return {
            body: schedule.task.body,
            title: schedule.task.title,
            recipients: schedule.task.recipients.map((r) => r.email).join(', '),
            date: schedule.date
        }
    })
    for (let m in mails) {
        const mail = mails[m];
        await sendMail(mail.title, mail.body, mail.recipients)
    }
}

module.exports = {
    scheduleCronJob,
    scheduleMailsForToday
};