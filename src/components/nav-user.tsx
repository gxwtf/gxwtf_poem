"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard, LogIn,
    LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import useSession from "@/lib/use-session"
import { defaultSession } from "@/lib/iron"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {useRouter} from "next/navigation";
import Link from "next/link";

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
    const router = useRouter()
    const { isMobile } = useSidebar()
    const { logout } = useSession()
    let pathname = '/dashboard';
    if (typeof window !== "undefined") {
        pathname = window.location.pathname;
    }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">广</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">广</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
              {user.avatar != "#" && (<>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                          <Link href="https://gxwtf.cn/account">
                              <BadgeCheck />账号中心
                          </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                          <Link href="https://gxwtf.cn/shop/record">
                              <CreditCard />
                              商店账单
                          </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                          <Bell />
                          通知中心
                      </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                      onClick={(e) => {
                          e.preventDefault()
                          logout(null, {
                              optimisticData: defaultSession,
                          })
                      }}
                  >
                      <LogOut />
                      登出
                  </DropdownMenuItem>
              </>)}
              {user.avatar == "#" && (<>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                      <Link href={`/login?back=${pathname}`}>
                          <LogIn />
                          登录
                      </Link>
                  </DropdownMenuItem>
              </>)}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
