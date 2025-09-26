// 自定义中间件，用于给某些路径设置密码，访问者必须正确输入用户名(gxwtf)和密码(gxwtf_2714)后才可以访问
// 如需添加路径，请编辑本代码最下方的 config 常量
// Author: wchengk09

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const username = "gxwtf"
  const password = "gxwtf_2714"

  // 如果未启用认证或未设置凭证，直接放行
  if (!username || !password) {
    return NextResponse.next()
  }

  const basicAuth = request.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':')

    if (user === username && pwd === password) {
      return NextResponse.next()
    }
  }

  // 认证失败，返回401
  return new NextResponse('需要认证', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

// 配置中间件生效的路径
export const config = {
  matcher: '/edit/:path*', // 保护/edit 下的所有路由
}