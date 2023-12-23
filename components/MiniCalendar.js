import React from 'react'


export default function MiniCalendar() {
    return (
      <div className="bg-transparent rounded-lg ">
        <div className="flex items-center justify-between">
          <button className="text-gray-600">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-[#52ab98]">December '23</h2>
          <button className="text-gray-600">
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mt-4 text-xs font-medium text-center text-gray-500">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div className="text-blue-500">Sat</div>
          <div className="text-red-500">Sun</div>
        </div>
        <div className="grid grid-cols-7 gap-1 mt-2 text-sm text-center">
          <div className="text-gray-400">27</div>
          <div className="text-gray-400">28</div>
          <div className="text-gray-400">29</div>
          <div className="text-gray-400">30</div>
          <div className="font-semibold">1</div>
          <div className="text-blue-500 font-semibold">2</div>
          <div className="text-red-500 font-semibold">3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div className="text-blue-500">9</div>
          <div className="text-red-500">10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
          <div className="text-blue-500">16</div>
          <div className="text-red-500">17</div>
          <div>18</div>
          <div>19</div>
          <div>20</div>
          <div>21</div>
          <div>22</div>
          <div className="text-blue-500">23</div>
          <div className="text-red-500">24</div>
          <div>25</div>
          <div>26</div>
          <div>27</div>
          <div>28</div>
          <div>29</div>
          <div className="text-blue-500">30</div>
          <div className="text-red-500">31</div>
        </div>
      </div>
    )
  }
  
  function ChevronLeftIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    )
  }
  
  
  function ChevronRightIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )
  }
  