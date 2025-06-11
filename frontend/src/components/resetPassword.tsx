
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react"
import type { ResetPasswordFormData, AuthView } from "../types/auth"

interface ResetPasswordProps {
  onViewChange: (view: AuthView) => void
  onResetPassword: (data: ResetPasswordFormData) => Promise<void>
  token?: string
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ onViewChange, token = "" }) => {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    token,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    if (formData.newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      setIsLoading(false)
      return
    }

    if (!token) {
      setError("Token de réinitialisation invalide ou manquant")
      setIsLoading(false)
      return
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Mot de passe réinitialisé</CardTitle>
            <CardDescription>
              Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre
              nouveau mot de passe.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => onViewChange("login")}>
              Continuer vers la connexion
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Réinitialiser le mot de passe</CardTitle>
          <CardDescription className="text-center">Entrez votre nouveau mot de passe ci-dessous</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre nouveau mot de passe"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmez votre nouveau mot de passe"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>Exigences du mot de passe :</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Au moins 8 caractères</li>
                <li>Inclure des lettres majuscules et minuscules</li>
                <li>Inclure au moins un chiffre</li>
                <li>Inclure au moins un caractère spécial</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading || !token}>
              {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
            </Button>

            <div className="text-center text-sm">
              Vous vous souvenez de votre mot de passe ?{" "}
              <button type="button" onClick={() => onViewChange("login")} className="text-blue-600 hover:text-blue-500">
                Se connecter
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
