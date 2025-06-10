import { Button } from "@0xsequence/design-system"
import { useNavigate } from "react-router"

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-200">
            Page Not Found
          </h2>
          <p className="text-gray-400 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/")}
          className="px-8 py-3 transition-all duration-300 transform hover:scale-105"
        >
          Return Home
        </Button>
      </div>
    </div>
  )
}
