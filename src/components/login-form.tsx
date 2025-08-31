"use client"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import useSession from "@/lib/use-session"
import {useRouter, useSearchParams} from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
    const router = useRouter()
    const { session, login } = useSession()
  const searchParams = useSearchParams()
  const back = searchParams.get("back") || "/dashboard"
  let host = "localhost:3000";
    if (typeof window !== "undefined") {
      host = window.location.host;
    }

  return (
    <form 
      className={cn("flex flex-col gap-6", className)} 
      onSubmit={function (event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const username = formData.get("username") as string
        const password = formData.get("password") as string
        login({ username, password }, {
          optimisticData: {
            ...session
          },
        }).then(() => {
            router.push(back)
        })
      }}
      method="POST"
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-primary text-2xl font-bold">欢迎回来</h1>
        <p className="text-muted-foreground text-sm text-balance">
          在下方输入你的用户名和密码以继续
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username" className="text-primary">用户名</Label>
          <Input id="username" name="username" type="text" placeholder="请输入用户名" required className="text-primary" />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-primary">密码</Label>
            <Link
              href="https://gxwtf.cn/emailVerify"
              className="text-primary ml-auto text-sm underline-offset-4 hover:underline"
            >
              忘记密码？
            </Link>
          </div>
          <Input id="password" name="password" type="password" placeholder="请输入密码" required className="text-primary" />
        </div>
        <Button type="submit" className="w-full">
          登录
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            或者通过以下方式继续
          </span>
        </div>
        <Link className={buttonVariants({ variant: "outline" }) + " text-primary w-full"} href={`/sso/login?system=${host}&back=${back}`}>
          <Image src="https://ai.gxwtf.cn/favicon.ico" alt="广学账号" width={20} height={20} />
          使用广学账号登录
        </Link>
      </div>
      <div className="text-primary text-center text-sm">
        没有账号？{" "}
        <Link href="https://ai.gxwtf.cn/register?back=http://localhost:3000/login" className="underline underline-offset-4">
          立即注册
        </Link>
      </div>
    </form>
  )
}
