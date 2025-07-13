interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export const WidgetTabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  return (
    <div className="relative">
      {/* Background container with rounded corners and border */}
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
        <nav className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`
                relative px-6 py-2 text-sm font-medium transition-all duration-200 cursor-pointer rounded-md
                ${
                  activeTab === tab.id
                    ? "text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
