import { BoothType, prisma } from "@workspace/db";

export async function createTenBooths(interviewerId) {
  const boothsData = Array.from({ length: 10 }).map((_, i) => ({
    interviewerId,
    title: `Booth ${i + 1}`,
    type: i % 2 === 0 ? BoothType.REACT : BoothType.HTML_CSS_JS,
    description: `Description for Booth ${i + 1}`,
    icon: "🎨",
  }));

  try {
    const createdBooths = await Promise.all(
      boothsData.map((booth) => {
        return prisma.booth.create({
          data: { ...booth },
        });
      })
    );

    console.log(`✅ Created ${createdBooths.length} booths`);
    return createdBooths;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);

    throw new Error("Error seeding booths");
  }
}
