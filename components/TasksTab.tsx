'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const toPersianDigits = (value: string | number): string => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return value.toString().replace(/\d/g, x => persianDigits[parseInt(x)]);
}
import { getTasks, completeTask, openTaskLink, Task } from '../utils/api'
import TaskWallet from '../icons/TaskWallet'
import ShahiCrown from '../icons/ShahiCrown'
import TaskTwitter from '../icons/TaskTwitter'
import TaskTelegram from '../icons/TaskTelegram'
import TaskInvite from '../icons/TaskInvite'

const TasksTab = () => {
    const [activeTab, setActiveTab] = useState<'in-game' | 'partners'>('in-game')
    const [tasks, setTasks] = useState<{ inGame: Task[]; partners: Task[] }>({ inGame: [], partners: [] })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [processingTask, setProcessingTask] = useState<string | null>(null)

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        try {
            const response = await getTasks()
            setTasks(response)
            setError(null)
        } catch (err) {
            setError('Failed to load tasks')
            console.error('Load tasks error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleStartTask = async (task: Task) => {
        try {
            setProcessingTask(task.id)
            await openTaskLink(task)
            const result = await completeTask(task.id)
            // Reload tasks to update completion status
            await loadTasks()
        } catch (err) {
            console.error('Start task error:', err)
        } finally {
            setProcessingTask(null)
        }
    }

    const getIconComponent = (task: Task) => {
        switch (task.icon) {
            case 'task-wallet':
                return TaskWallet
            case 'twitter-task':
                return TaskTwitter
            case 'telegram-task':
                return TaskTelegram
            case 'task-invite':
                return TaskInvite
            case 'shahi':
                return ShahiCrown
            default:
                return ShahiCrown
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4c9ce2]"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                {error}
            </div>
        )
    }

    return (
        <div className={`quests-tab-con px-4 transition-all duration-300`}>
            {/* Header */}
            <div className="pt-8">
                <h1 className="text-3xl font-parastoo mb-2">پاداش</h1>
                <div>
                    <span className="text-xl font-parastoo">شاهی </span>
                    <span className="text-xl text-gray-500 font-parastoo">با</span>
                </div>
                <div className="text-xl text-gray-500  font-parastoo">ماموریت های پادشاهی</div>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-0 mt-6">
                <button
                    onClick={() => setActiveTab('in-game')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-parastoo transition duration-300 
                        ${activeTab === 'in-game'
                            ? 'bg-white text-black'
                            : 'bg-[#151515] text-white'
                        }`}
                >
                    ماموریت های سلطنتی
                </button>
                <button
                    onClick={() => setActiveTab('partners')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-parastoo flex items-center justify-center gap-2 transition duration-300 
                        ${activeTab === 'partners'
                            ? 'bg-white text-black'
                            : 'bg-[#151515] text-white'
                        }`}
                >
                    همکاران
                    <div className="bg-[#5a5a5a] text-[#fefefe] size-4 rounded-full flex items-center justify-center text-[11px] font-parastoo">
                        ۱
                    </div>
                </button>
            </div>

            {/* Tasks List */}
            <div className="mt-4 mb-20 bg-[#151516] rounded-xl font-parastoo">
                {(activeTab === 'in-game' ? tasks.inGame : tasks.partners).map((task, index) => {
                    const IconComponent = getIconComponent(task)
                    return (
                        <div
                            key={task.id}
                            className="flex items-center"
                        >
                            <div className="w-[72px] flex justify-center">
                                <div className="w-10 h-10">
                                {getIconComponent(task)({ className: "w-full h-full text-[#4c9ce2]" })}
                                </div>
                            </div>
                            <div className={`flex items-center justify-between w-full py-4 pr-4 ${index !== 0 && "border-t border-[#222622]"
                                }`}>
                                <div>
                                    <div className="text-[17px]">{task.name}</div>
                                    <div className="text-gray-400 text-[14px] font-parastoo">{toPersianDigits(task.points)}</div>
                                </div>
                                <button 
                                    onClick={() => !task.isCompleted && handleStartTask(task)}
                                    disabled={task.isCompleted || processingTask === task.id}
                                    className={`h-8 px-4 rounded-full text-sm font-medium flex items-center ${
                                        task.isCompleted 
                                            ? 'bg-green-500 text-white cursor-not-allowed'
                                            : processingTask === task.id
                                            ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                            : 'bg-white text-black hover:bg-gray-100'
                                    }`}
                                >
                                    {task.isCompleted 
                                        ? 'آفرین' 
                                        : processingTask === task.id
                                        ? 'در حال انجام...'
                                        : 'بزن بریم'
                                    }
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TasksTab
