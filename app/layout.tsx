const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="pt">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout;