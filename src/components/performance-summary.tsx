import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

export default function PerformanceSummary() {
  const metrics = [
    {
      title: "Total Impressions",
      value: "240,482",
      change: "+1,458,693 all time",
      changeColor: "text-gray-500",
    },
    {
      title: "Total Engagement",
      value: "345,482",
      change: "+12.67% last week",
      changeColor: "text-green-500",
    },
    {
      title: "Followers Growth",
      value: "123,685",
      change: "+353,999 all followers",
      changeColor: "text-gray-500",
    },
    {
      title: "Account Reach",
      value: "1,379,786",
      change: "+4.89% last month",
      changeColor: "text-green-500",
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Performance Summary</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get a quick overview of your key performance metrics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {metrics.map((metric, index) => (
            <div key={index} className="border-t-2 border-indigo-500 pt-4">
              <div className="flex items-center gap-1 mb-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-3.5 w-3.5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Information about {metric.title.toLowerCase()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{metric.value}</p>
              <p className={`text-sm ${metric.changeColor}`}>{metric.change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
