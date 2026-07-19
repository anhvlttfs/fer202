# Booker - UI/UX Design Specification

Version: 1.0

---

# 1. Tổng quan

Booker là một ứng dụng đọc sách với giao diện tối giản, hiện đại.

Màu sắc chủ đạo:

- White
- Cream
- Teal
- Gray

Thiết kế theo phong cách:

- Minimal
- Soft Shadow
- Rounded Corner
- Large White Space

---

# 2. Layout tổng thể

Ứng dụng gồm 4 vùng chính.

```
+---------------------------------------------------------------+
| Header                                                        |
+-------------+-----------------------------------+-------------+
|             |                                   |             |
| Left Menu   | Main Content                      | Right Panel |
|             |                                   |             |
|             |                                   |             |
+-------------+-----------------------------------+-------------+
```

Layout Desktop

```
Sidebar        : 180px
Main Content   : Flexible
Right Sidebar  : 260px
```

Container

```
max-width: 1440px
margin: auto
padding: 32px
```

Background

```
#FFFFFF
```

---

# 3. Header

Bao gồm

- Logo
- Search
- User

## 3.1 Logo

Text

```
Booker
```

Style

```
font-size:32px
font-weight:700
color:#2F9C95
```

---

## 3.2 Search Box

Chiếm gần giữa màn hình.

Structure

```
+---------------------------------------+
| Find a book...            🔍          |
+---------------------------------------+
```

Style

```
height:52px

border-radius:30px

border:
1px solid #D9D9D9

background:white

padding:
0 20px

width:
450~520px
```

Placeholder

```
Find a book...
```

Search Button

```
40x40

background:
#2F9C95

icon:
white

radius:
50%
```

---

## 3.3 User Profile

Hiển thị

Avatar

Tên

```
James F.
```

Layout

```
James F.     Avatar
```

---

# 4. Left Sidebar

Title

```
Genes
```

(Dựa trên UI có thể là "Genres")

Các mục

```
⚔ Action

🌴 Adventure

⌛ Classic

🕵 Mystery

🧙 Fantasy
```

Khoảng cách

```
16px
```

Font

```
16px

Weight
500
```

Hover

```
background:
#F8F8F8

radius:
8px
```

Selected

```
color:
#2F9C95
```

---

# 5. Right Sidebar

Title

```
Most read
```

Hiển thị danh sách sách đọc nhiều.

Card

```
+-------------------------+
|cover|title         73%  |
|     |progress bar       |
+-------------------------+
```

Kích thước

```
height:
70px
```

Cover

```
40x60
```

Progress

```
height:
5px

radius:
10px

background:
#E4E4E4

fill:
#2F9C95
```

Thông tin

- Author
- Book title
- Percent

---

# 6. Home Screen

Gồm

```
Trending

New Books
```

---

# 7. Trending Section

Title

```
Trending
```

Có nút

```
ver más
```

(card scroll ngang)

Khoảng

```
24px
```

Card

```
160x230
```

Bo góc

```
18px
```

Shadow

```
0 8 20 rgba(0,0,0,.12)
```

Hover

```
scale(1.04)
```

---

# 8. New Books

Danh sách dạng dọc.

Mỗi Card

```
+---------------------------------------------------------+
| Cover | Author                                          |
|       | Title                                           |
|       | Description                                     |
|       | Tags                                             ♥ 👁 |
+---------------------------------------------------------+
```

Height

```
160px
```

Background

```
#FFF6DA
```

Radius

```
18px
```

Padding

```
20px
```

---

## Book Cover

```
110x150
```

Radius

```
14px
```

---

## Author

```
16px

Medium
```

---

## Title

```
22px

Bold
```

---

## Description

Hiển thị

3 dòng

Sau đó

```
...
```

---

## Tags

Ví dụ

```
Action

Historic
```

Style

```
background:
#FFEFB6

padding:
8px 16px

radius:
12px
```

---

## Statistics

Hiển thị

❤️ Likes

👁 Views

Ví dụ

```
❤️ 363

👁 1.7k
```

Canh phải.

---

# 9. Empty State

Ảnh thứ hai thể hiện trạng thái chưa có dữ liệu.

Header

Có

Sidebar phải

Có

Main

Trống hoàn toàn.

Dùng khi

- Chưa load
- Không có kết quả
- Search rỗng

Có thể thêm

```
No books found
```

hoặc

```
Start searching...
```

---

# 10. Book Detail Screen

Layout

```
+----------------------------------------------+
| Cover | Author                               |
|       | Title                                |
|       | Tags                                 |
|       | Start Reading                        |
|       | Likes / Views                        |
+----------------------------------------------+

About this book

Description
```

---

## Book Hero Card

Background

```
#FFF6DA
```

Radius

```
22px
```

Padding

```
28px
```

---

## Cover

```
180x260
```

Radius

```
18px
```

---

## Title

```
40px

Bold
```

---

## Author

```
20px

Medium
```

---

## Favorite Button

Outline Heart

Top Right

```
44x44
```

---

## Genre Tag

Giống Home.

---

## Start Reading Button

```
height:
48px

padding:
0 28px

background:
#2F9C95

color:white

radius:
12px

font-weight:
600
```

Hover

```
background:
#25877F
```

---

## Statistics

```
❤️ 363

👁 1.7k
```

Nằm dưới button.

---

# 11. About Section

Title

```
About this book
```

Font

```
32px

Bold
```

Description

```
18px

line-height:
1.8
```

---

# 12. Typography

Primary

```
Poppins
```

Fallback

```
sans-serif
```

Heading

```
40
32
24
20
```

Body

```
18
16
14
```

---

# 13. Color Palette

Primary

```
#2F9C95
```

Primary Hover

```
#25877F
```

Cream

```
#FFF6DA
```

Background

```
#FFFFFF
```

Border

```
#E6E6E6
```

Text Primary

```
#1E1E1E
```

Text Secondary

```
#6F6F6F
```

Tag

```
#FFEFB6
```

Progress BG

```
#D9D9D9
```

Shadow

```
rgba(0,0,0,0.12)
```

---

# 14. Border Radius

Cards

```
18px
```

Large Card

```
22px
```

Button

```
12px
```

Input

```
30px
```

Avatar

```
50%
```

---

# 15. Shadow

Cards

```
0 8px 20px rgba(0,0,0,.12)
```

Hover

```
0 12px 28px rgba(0,0,0,.16)
```

---

# 16. Responsive

Desktop

```
>=1280px
```

Tablet

```
768-1279px
```

Sidebar thu nhỏ.

Trending còn 3 card.

Mobile

```
<=767px
```

Header xếp dọc.

Sidebar chuyển thành Drawer.

Most Read xuống cuối.

Cards full width.

---

# 17. Components

## Button

Variants

- Primary
- Secondary
- Icon

---

## Input

Variants

- Search

---

## Card

- Trending Card
- Book Card
- Most Read Card
- Detail Card

---

## Badge

Genre Badge

---

## Progress Bar

Most Read

---

## Avatar

User Avatar

---

## Icons

- Search
- Heart
- Eye
- Sword
- Palm
- Hourglass
- Detective
- Wizard

---

# 18. User Flow

```
Home

↓

Search Book

↓

Book List

↓

Book Detail

↓

Start Reading
```

---

# 19. Interaction

Search

- Enter
- Click Search

Trending Card

- Hover
- Click → Detail

Book Card

- Hover Shadow
- Click → Detail

Favorite

Click

Heart Filled

Start Reading

Click

Open Reader

---

# 20. Accessibility

- Contrast đạt WCAG AA.
- Font tối thiểu 14px.
- Nút bấm tối thiểu 44×44px.
- Hỗ trợ điều hướng bằng bàn phím.
- Focus state rõ ràng cho Input, Button và Card.

---

# 21. Animation

Card Hover

- Scale: 1 → 1.04
- Duration: 200ms
- Ease-out

Button Hover

- Background transition: 150ms

Page Transition

- Fade In: 250ms

Search Result

- Slide Up: 200ms

---

# 22. Data Model (Đề xuất)

## Book

- id
- title
- author
- cover
- description
- genres[]
- likes
- views
- rating
- progress
- publishedDate

## Genre

- id
- name
- icon

## User

- id
- name
- avatar

---

# 23. API Endpoints (Đề xuất)

GET /books/trending

GET /books/new

GET /books/most-read

GET /books/{id}

GET /books/search?q=

GET /genres

POST /favorites

POST /reading/start
