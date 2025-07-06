interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  return (
    <div className="relative">
      {/* Background container with rounded corners and border */}
      <div className="bg-[#1D293D] border border-[#45556C] rounded-lg p-1">
        <nav className="flex">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`
                relative px-4 py-2 text-sm font-medium transition-all duration-200
                ${
                  activeTab === tab.id
                    ? "text-[#F4F4F5] bg-[#45556C] rounded-md shadow-sm"
                    : "text-[#F4F4F5] hover:text-white hover:bg-[#2D3A4F] rounded-md"
                }
                ${index === 0 ? "ml-0" : "ml-1"}
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
