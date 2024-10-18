"use client";

import { Card, CardBody } from "@nextui-org/react";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Blog() {
  return (
    <div className="container mx-auto flex flex-col items-center space-y-8 px-4 py-8">
      <div className="text-center">
        <p className="text-blue-600">Có thể bạn sẽ cần</p>
        <h2 className="text-3xl font-bold uppercase">Các bài viết</h2>
        <p className="text-muted-foreground">
          Để thiết kế được một chiếc áo thun đẹp cần rất nhiều kỹ năng.
          <br />
          Dưới đây là những bài viết chia sẻ những kỹ thuật thiết kế và những
          điều bạn cần lưu ý!
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array(3)
          .fill("")
          .map((_, index) => (
            <Card key={index} className="w-full">
              <div className="relative">
                <img
                  alt="Blog post"
                  className="h-48 w-full object-cover"
                  height="200"
                  src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/f3763227-9b60-4a63-bb5d-8e779f8bc12e.jpg"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                  width="300"
                />
                <div className="absolute left-2 top-2 rounded-full bg-black px-3 py-1 text-sm text-white">
                  New
                </div>
              </div>
              <CardBody className="space-y-2">
                <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                  <span>Google</span>
                  <span>Trending</span>
                  <span>New</span>
                </div>
                <h3 className="text-xl font-semibold">
                  Loudest à la Madison #1 (L&apos;integral)
                </h3>
                <p className="text-sm">
                  We focus on ergonomics and meeting you where you work.
                  It&apos;s only a keystroke away.
                </p>
                <div className="text-muted-foreground flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>22 April 2021</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>10 comments</span>
                  </div>
                </div>
                <Link
                  className="mt-2 block text-blue-600"
                  href="#"
                  prefetch={false}
                >
                  Learn More <ArrowRight className="inline h-4 w-4" />
                </Link>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
}
