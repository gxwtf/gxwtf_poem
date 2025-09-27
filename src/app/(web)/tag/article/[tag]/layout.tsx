interface Props {
    params: Promise<{ tag: string }>;
}

export async function generateMetadata(props: Props) {
    const { tag } = await props.params;
    const Tag = decodeURIComponent(tag);
    return {
        title: `读书课标签 - ${Tag}`,
        description: `包含${Tag}标签的读书课列表`,
    };
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}