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
      <div className="bg-[#1D293D] border border-[#45556C] rounded-lg p-3">
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
                    ? "text-[#F4F4F5] bg-[#45556C] shadow-sm"
                    : "text-[#F4F4F5] hover:text-white hover:bg-[#2D3A4F]"
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
