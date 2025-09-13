"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import useSession from "@/lib/use-session";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && session?.isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <section className="dark relative flex h-svh max-h-[1400px] w-svw overflow-hidden bg-[url('/huoban.png')] bg-cover bg-center bg-no-repeat font-sans after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:bg-black/20 after:content-[''] md:h-svh">
        <div className="relative z-30 m-auto flex max-w-[46.25rem] flex-col items-center justify-center gap-6 px-5">
          <div className="text-foreground text-center font-serif text-4xl leading-tight md:text-6xl xl:text-[4.4rem]">
            广学古诗文
          </div>
          <p className="text-foreground text-center text-base">
            正在加载中...
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-[url('/noise.png')] bg-repeat opacity-15" />
      </section>
    );
  }

  if (session?.isLoggedIn) {
    return null; // 跳转中，不渲染内容
  }

  return (
    <section className="dark relative flex h-svh max-h-[1400px] w-svw overflow-hidden bg-[url('/huoban.png')] bg-cover bg-center bg-no-repeat font-sans after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:bg-black/20 after:content-[''] md:h-svh">
      <div className="relative z-30 m-auto flex max-w-[46.25rem] flex-col items-center justify-center gap-6 px-5">
        <h1 className="text-foreground text-center font-serif text-4xl leading-tight md:text-6xl xl:text-[4.4rem]">
          广学古诗文
        </h1>
        <p className="text-foreground text-center text-base">
          中学语文一站式学习平台，在玩中领略诗词之美。
        </p>
        <Button className="h-fit w-fit rounded-full px-7 py-4 text-sm font-medium leading-tight" asChild>
          <Link href="/dashboard">
            进入广学古诗文
          </Link>
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-[url('/noise.png')] bg-repeat opacity-15" />
      
      {/* 备案信息 */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center">
        <div className="text-foreground/70 text-xs">
          <Link href="/about" className="hover:text-foreground transition-colors">
            关于我们
          </Link>
          <span className="mx-2">|</span>
          <Link href="https://beian.miit.gov.cn/" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
            京ICP备2025107534号-1
          </Link>
        </div>
      </div>
    </section>
  );
}
